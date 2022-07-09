class Restaurant < ApplicationRecord
  
  validates :name, :image, presence: true 
  
end
