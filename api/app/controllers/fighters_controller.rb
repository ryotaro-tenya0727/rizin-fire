class FightersController < ApplicationController

  def index
    fighters = Fighter.all
    render json: {
      fighters: fighters
    }, status: :ok
  end

  def create
    @fighter = Fighter.find_by(fighter_number: params[:fighter_number])
    if @fighter
      @fighter.update(count: @fighter.count + 1)

    end
  end
end
