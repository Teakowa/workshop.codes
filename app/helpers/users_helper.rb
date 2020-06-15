module UsersHelper
  def accessibility_settings
    "#{ "simple-view" if current_user.simple_view? } #{ "high-contrast" if current_user.high_contrast? } #{ "large-fonts" if current_user.large_fonts? }"
  end

  def is_admin?(user)
    return true if user && user.level == "admin"
  end

  def is_banned?(user)
    return true if user && user.level == "banned"
  end
end
