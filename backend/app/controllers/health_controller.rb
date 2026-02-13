class HealthController < ApplicationController
  def index
    render json: { status: "ok", message: "Micro-SaaS API is running 🚀" }
  end
end