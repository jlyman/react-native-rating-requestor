require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-rating-requestor"
  s.version      = package["version"]
  s.summary      = "Use this component with POD"
  s.author       = "Brent Vatne <brentvatne@gmail.com> (https://github.com/brentvatne)"

  s.homepage     = "https://github.com/jlyman/react-native-rating-requestor"

  s.license      = "MIT"

  s.ios.deployment_target = "7.0"
  s.tvos.deployment_target = "9.0"

  s.source       = { :git => s.homepage, :tag => "#{s.version}" }

  s.source_files  = "ios/*.{h,m}"

  s.dependency "React"
  s.ios.frameworks = "StoreKit"
end
