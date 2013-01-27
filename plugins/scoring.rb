require 'yaml/store'

module ChannelMixin
  def fetchData()
    nb_preload = 11
    nb_preload = 1 if(@nb_songs <=  15) # first we check the number of songs in the database leading to left_side (playlist : <s> s s s *c* s s s)

    delta     = [ nb_preload - @queue.size, 0 ].max;
    delta.times {
      # keep a file from being include twice in the next x songs
      last_insert = @queue[-nb_preload..-1] || [];
      begin
        entry = @library.get_file().first;
      end while last_insert.include?(entry.mid) # the space we look is (10 + preload) wide (30min) see above
      pos = @queue.add(entry.mid, :log => false);
    }
    super();
  end

  #XXXdlet: overriding Channel next function. is it ruby's way ?
  def next()
    super
    log("uber plugin talking")
    log_action(__method__)
  end

  # log any action on current entry to channel_action.log file
  def log_action(action)
    filename = "channel_action.log"
    require 'yaml/store'
    log_store = YAML::Store.new filename

    action_object = [action,
                     ["artist" => @currentEntry.artist,
                      "album" => @currentEntry.album,
                      "genre" => @currentEntry.genre]]

    puts action_object.to_yaml

    log_store.transaction do
      log_store['actions'] += action_object
    end
  end

end

module SongQueueMixin
  def setlib(library)
    @library = library
  end

  def add(pos = nil, mid, opt = { :log => true})
    super(pos, mid);
    log_action(__method__, mid) if(opt[:log]);
  end

  def del(pos)
    mid = super(pos);
    log_action(__method__, mid)
  end

  # log any action on current entry to channel_action.log file
  def log_action(action, mid)
    begin
      puts mid
      song = @library.get_file(mid).first
      
      filename = "channel_action.log"
      log_store = YAML::Store.new filename
      
      action_object = [action,
                       ["artist" => song.artist,
                        "album" => song.album,
                        "genre" => song.genre]]

      puts action_object.to_yaml

      log_store.transaction do
        log_store['actions'] += action_object
      end
    rescue => e
      error("error scoring #{e}")
    end
  end
end

class Classifier
  attr_writer :scores
  attr_writer :indexes
  attr_writer :entries
  attr_writer :total_sum

  # scores   = [ (mid, score), ... ]
  # indexes  = { :artists = {name, [score_item0, ....]},
  #              :genre   = ...

  def initialize(db)
    @scores = []
    @indexes = {
      :artists => Hash.new { |hash, key| hash[key] = [] },
      :albums => Hash.new { |hash, key| hash[key] = [] },
      :genres => Hash.new { |hash, key| hash[key] = [] },
    }
    @entries = 0

    # populate scores with null values for each song
    # from db ?

    songs = db.request(fieldsSelection="mid, artist, album, genre")
    songs.each do |song|
      register_song(song)
    end

  end

  def register_song(song)
    # scores.push([mid, score])
    # Score=Struct.new :mid, :score
    score = [song.mid, 0]
    scores << score
    # add ref(mid, score) to indexes.artists, album, genre
    @indexes[:artists] = song.artist
    @indexes[:albums] = song.album
    @indexes[:genres] = song.genre
  end

  def promote()
    # +1
    # join on artist, album, genre
  end

  def demote()
    # /2
    # join on artist, album, genre
  end

  def dump()
    # dump this class
  end

  def load()
    # load up previous learning
  end

end
