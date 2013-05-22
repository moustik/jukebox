# This Ruby dark magic allow class instances behavior to be overriden
# at runtime.

# As we want our plugins to be properly removed with no side effect
# behaviours we keep tracks of installed plugin through the @ancestor
# instance member

module Plugable
  def extend mod
    @ancestors ||= {}
    return if @ancestors[mod]
    mod_clone = mod.clone
    @ancestors[mod] = mod_clone
    super mod_clone
  end

  # Get rid of a given plugin and invalidate its function thus
  # 'reactivating' original ones
  def remove mod
    mod_clone = @ancestors[mod]
    mod_clone.instance_methods(false).each {|m|
      mod_clone.module_eval { remove_method m }
    }
    @ancestors[mod] = nil
  end
end
