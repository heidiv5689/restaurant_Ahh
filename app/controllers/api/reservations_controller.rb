class Api::ReservationsController < ApplicationController
  before_action :set_restaurant
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    @mornings = @restaurant.reservations.where(timeslot: 'morning')
    @brunchs = @restaurant.reservations.where(timeslot: 'brunch')
    @dinners = @restaurant.reservations.where(timeslot: 'dinner')
    render json: { mornings: @mornings, brunchs: @brunchs, dinners: @dinners }
  end

  def show
    render json: @reservation
  end

  def enrolledUsers
    render json: @restaurant.users 
  end

  def unenrolledUsers
    @users = User.all - @restaurant.users 
    render json: @users
  end


  def create
    @reservation = @restaurant.reservations.new(reservation_params)
    if @reservation.save 
      render json: @reservation
    else
      render json: { errors: @reservation.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @reservation.update(reservation_params)
      render json: @reservation
    else
      render json: { errors: @reservation.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation.destroy
    render json: { message: 'deleted reservation' }
  end

  private
  def reservation_params
    params.require(:reservation).permit(:name, :timeslot, :user_id)
  end

  def set_restaurant
    @restaurant = Restaurant.find(params[:restaurant_id])
  end

  def set_reservation
    @reservation = @restaurant.reservations.find(params[:id])
  end

end
