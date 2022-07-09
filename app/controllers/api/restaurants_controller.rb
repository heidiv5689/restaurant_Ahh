class Api::RestaurantsController < ApplicationController
 # before_action :authenticate_user!
 before_action :set_restaurant, only: [:show, :update, :destroy]
  
 def index
   render json: Restaurant.all 
 end

 def show
   render json: @restaurant
 end

 def create
   @restaurant = Restaurant.new(restaurant_params)
   if @restaurant.save 
     render json: @restaurant
   else
     render json: { errors: @restaurant.errors }, status: :unprocessable_entity
   end
 end

 def update
   if @restaurant.update(restaurant_params)
     render json: @restaurant
   else
     render json: { errors: @restaurant.errors }, status: :unprocessable_entity
   end
 end

 def destroy
   @restaurant.destroy
   render json: { message: 'Restaurant removed' }
 end

 private
 def restaurant_params
   params.require(:restaurant).permit(:name, :image)
 end

 def set_restaurant
   @restaurant = Restaurant.find(params[:id])
 end


end
