class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :name, :timeslot, presence: true
  
end
