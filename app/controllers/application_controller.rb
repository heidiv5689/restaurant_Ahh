class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        before_action :configure_permitted_parameters, if: :devise_controller? 

        protected 
          # user_params 
          # params.require(:user).permit(:email, :password)
          # params.require(:user).permit(:email, :password, :first, :last, :image)
      
          def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:first, :last, :image])
          end
      
end
