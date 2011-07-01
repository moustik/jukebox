#!/usr/bin/env ruby

require 'rev'
require 'socket'

load 'http.rb'
load 'mp3.rb'

class ChannelsCron < Rev::TimerWatcher
  def initialize()
    super(0.2, true);
    @channels = [];
  end

  def register(ch)
    @channels.push(ch);
  end

  def unregister(ch)
    @channels.delete(ch);
  end

  private 
  def on_timer
    @channels.each { |c|
      c.cron();
    }
  end
end

$channelsCron = ChannelsCron.new();
$channelsCron.attach(Rev::Loop.default)

class Mp3Channel < Mp3Stream
  def initialize(name, files)
    @name  = name;
    @files = files;
    @scks  = [];
    super();
  end

  def name
    @name
  end

  def cron()
    trames = play();
    trames.each { |t|
      @scks.each { |s|
        s.write(t.to_s());
      }
    }
  end

  def register(s)
    if(@scks.size() == 0)
      $channelsCron.register(self);
      start();
    end
    @scks.push(s);
  end

  def unregister(s)
    @scks.delete(s);
    if(@scks.size() == 0)
      $channelsCron.unregister(self);
    end
  end

  def next()
    flush();
  end

  private
  def fetchData()
    p = @files[0];
    @files.rotate!();
    fd = File.open(p);
    data = fd.read();
    fd.close();
    data;    
  end
end

ch = Mp3Channel.new(ARGV);


h = HttpServer.new();
h.addFile("/test", ch) { |s, req, ch|
  options = {
    "Connection"   => "Close",
    "Content-type" => "audio/mpeg"};
  rep = HttpResponse.new(req.proto, 200, "OK", options);
  s.write(rep.to_s);
  ch.register(s);

  s.on_disconnect(ch) { |s, ch|
    ch.unregister(s);
  }
}

h.addPath("/session") { |s, req, data|
  rep = HttpResponse.new(req.proto, 200, "OK");
  rep.setData("<html><head><title>session</title></head><body><H1>MY session #{req.uri}</H1></body></head>");
  s.write(rep.to_s);
}

h.attach(Rev::Loop.default)

Rev::Loop.default.run();

