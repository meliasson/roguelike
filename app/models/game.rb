class Game < ActiveRecord::Base
  serialize :dungeon
  serialize :characters
end
