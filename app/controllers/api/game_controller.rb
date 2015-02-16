module Api
  class GameController < ApplicationController
    def create
      game_id = 1
      @game = Game.new(game_id, Characters.assemble, Dungeon.generate)
      cookies[:game_id] = game_id
    end
  end

  class Game
    attr_reader :id
    attr_reader :characters
    attr_reader :dungeon

    def initialize(id, characters, dungeon)
      @id = id
      @characters = characters
      @dungeon = dungeon
    end
  end

  class Dungeon
    def self.generate
      [[0, 0, 0, 0, 0],
       [0, 1, 1, 1, 0],
       [0, 1, 1, 1, 0],
       [0, 1, 1, 1, 0],
       [0, 0, 0, 0, 0]]
    end
  end

  class Characters
    def self.assemble
      [{ pos: [2, 3] }]
    end
  end
end
