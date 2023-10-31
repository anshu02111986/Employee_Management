# frozen_string_literal: true

class Employment < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :personal_data

  validates :employer, presence: true
  validates :date_started, presence: true
  validates :date_ended, presence: true
end
