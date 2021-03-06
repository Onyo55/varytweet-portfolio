class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    redirect_to theme_path(params[:theme_id])
  end

  def create
    comment = Comment.create(comment_params)
    l_created_at = l comment.created_at 
    render json: { comment: comment,
                   user_name: comment.user.name,
                   l_created_at: l_created_at }
  end

  private

  def comment_params
    params.require(
      :comment
    ).permit(
      :text
    ).merge(
      user_id: current_user.id, theme_id: params[:theme_id], sub_theme_num: params['sub-theme-btn']
    )
  end
end
