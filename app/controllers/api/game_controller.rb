module Api
  class GameController < ApplicationController
    def create
      game_id = 1
      @game = Game.new(game_id, Dungeon.generate)
      cookies[:game_id] = game_id
    end
  end

  class Game
    attr_reader :id
    attr_reader :dungeon

    def initialize(id, dungeon)
      @id = id
      @dungeon = dungeon
    end
  end

  class Dungeon
    def self.generate
      [[0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0]]
    end
  end
end
