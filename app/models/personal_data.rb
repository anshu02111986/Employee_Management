# frozen_string_literal: true

class PersonalData < ApplicationRecord # rubocop:disable Style/Documentation
  has_many :employments, dependent: :destroy

  validates :first_name, presence: true, length: { maximum: 25 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :email_address, presence: true, uniqueness: true
  validates :phone_number, presence: true
end
