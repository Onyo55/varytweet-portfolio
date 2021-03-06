class ThemesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def index
    @themes = Theme.all.includes(:comments)
  end

  def new
    @theme = Theme.new
  end

  def create
    @theme = Theme.new(theme_params)
    if @theme.save
      redirect_to theme_path(@theme.id)
    else
      render :new
    end
  end

  def show
    @theme = Theme.find(params[:id])
    @comment = Comment.new
    @comments = @theme.comments.includes(:user).order('created_at DESC')
  end

  def destroy
    theme = Theme.find(params[:id])
    if current_user.id == theme.user.id
      if theme.destroy
        redirect_back(fallback_location: root_path)
      else
        render :index
      end
    else
      redirect_to root_path
    end
  end

  def search
    @themes = Theme.search(params[:keyword])
    render :index
  end

  private

  def theme_params
    params.require(
      :theme
    ).permit(
      :main_theme, :sub_theme_1, :sub_theme_2
    ).merge(user_id: current_user.id)
  end
end
