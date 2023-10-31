class PersonalDataController < ApplicationController
  before_action :set_personal_data, only: %i[show update]
  before_action :ensure_frame_response, only: :new

  def index
    @personalData = PersonalData.includes(:employments).all
  end

  def new
    @personalData = PersonalData.new
  end

  def create
    @personalData = PersonalData.new(personal_data_params)
    respond_to do |format|
      if @personalData.save
        format.turbo_stream do
          render turbo_stream: turbo_stream.remove('personal-data-form') +
                               turbo_stream.update(
                                 'employment-modal',
                                 partial: 'employments/employment_modal',
                                 locals: { personal_data_id: @personalData.id }
                               )
        end
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @personalData.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_personal_data
    @personalData = PersonalData.find(params[:id])
  end

  def ensure_frame_response
    return unless Rails.env.development?

    redirect_to root_path unless turbo_frame_request?
  end

  def personal_data_params
    params.require(:personal_data).permit(:first_name, :last_name, :nick_name, :email_address, :phone_number)
  end
end
