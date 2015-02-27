module Api
  class GameController < ApplicationController
    def create
      @game = Game.new
      @game.characters = Character.generate
      @game.dungeon = Dungeon.generate2
      @game.save
      cookies[:game_id] = @game.id
    end

    def update
      @game = Game.find(params[:id])
      case params[:act]
      when 'move'
        @game = Game.find(params[:id])
        move(@game.characters[0][:pos], @game.dungeon)
        @game.save
      end
    end

    private

    def move(position, dungeon)
      case params[:dir]
      when 'left'
        move_left(position, dungeon)
      when 'right'
        move_right(position, dungeon)
      when 'up'
        move_up(position, dungeon)
      when 'down'
        move_down(position, dungeon)
      end
    end

    def move_left(position, dungeon)
      position[1] -= 1 if dungeon[position[0]][position[1] - 1] == 2
    end

    def move_right(position, dungeon)
      position[1] += 1 if dungeon[position[0]][position[1] + 1] == 2
    end

    def move_up(position, dungeon)
      position[0] -= 1 if dungeon[position[0] - 1][position[1]] == 2
    end

    def move_down(position, dungeon)
      position[0] += 1 if dungeon[position[0] + 1][position[1]] == 2
    end
  end
end
