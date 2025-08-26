import { View, Image, TouchableOpacity, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import InterSemiBold from "@/components/Text/InterSemiBold";
import BackBtn from "@/components/common/BackBtn";
import { PROFILE } from "@/constants/images-icons";
import InterMedium from "@/components/Text/InterMedium";
import Icon from "@/components/common/Icon";
import { PROFILETICK, CHEVRONRIGHT } from "@/assets/icons";
import Button from "@/components/common/Button";
import InterRegular from "@/components/Text/InterRegular";
import { getProfileList } from "./_profileList";
import { useMode } from "@/contexts/ModeContext";
import { useAuth } from "@/hooks/useShedaApi";
import { useApi } from "@/contexts/ApiContext";
import { Alert } from "react-native";
import { router } from "expo-router";

const Profile = () => {
  const { mode, toggleMode, isSeller } = useMode();
  const { logout, isLoading, isAuthenticated } = useAuth();
  const { user, isLoading: isProfileLoading } = useApi();

  // Debug function to show current auth state
  const debugShowAuthState = () => {
    console.log("🔧 Debug: Current authentication state:");
    console.log("🔧 Debug: isAuthenticated:", isAuthenticated);
    console.log("🔧 Debug: user:", user);
    console.log("🔧 Debug: current URL:", window.location.href);
    console.log("🔧 Debug: localStorage:", Object.keys(localStorage));

    // Check AsyncStorage
    AsyncStorage.getItem("auth_token").then((token) => {
      console.log("🔧 Debug: auth_token in AsyncStorage:", token);
    });
    AsyncStorage.getItem("user_data").then((userData) => {
      console.log("🔧 Debug: user_data in AsyncStorage:", userData);
    });
  };

  // Debug function to manually clear auth state
  const debugClearAuth = async () => {
    console.log("🔧 Debug: Manually clearing authentication state...");
    try {
      // Clear AsyncStorage
      await AsyncStorage.multiRemove(["auth_token", "user_data"]);
      console.log("🔧 Debug: Cleared AsyncStorage");

      // Force redirect to login page
      console.log("🔧 Debug: Forcing redirect to login...");
      try {
        router.replace("/(auth)/Login");
        console.log("🔧 Debug: Router redirect called");
      } catch (routerError) {
        console.error("🔧 Debug: Router redirect failed:", routerError);

        // Fallback: try direct navigation
        try {
          window.location.href = "/Login";
          console.log("🔧 Debug: Direct navigation called");
        } catch (navError) {
          console.error("🔧 Debug: Direct navigation failed:", navError);

          // Last resort: force page reload
          console.log("🔧 Debug: Forcing page reload...");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("🔧 Debug: Failed to clear auth state:", error);
    }
  };

  // Debug function to force navigation to login
  const debugForceLogin = () => {
    console.log("🔧 Debug: Force navigating to login...");
    try {
      // Try multiple navigation methods
      window.location.href = "http://localhost:8081/Login";
      console.log("🔧 Debug: Direct URL navigation called");
    } catch (error) {
      console.error("🔧 Debug: Direct navigation failed:", error);
      window.location.reload();
    }
  };

  // User data is already loaded from login process, no need to fetch again

  const handleLogout = async () => {
    console.log("🚪 Logout button clicked");

    // For web environment, use confirm instead of Alert
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (!confirmed) {
        console.log("❌ Logout cancelled by user");
        return;
      }

      console.log("🔄 Starting logout process...");
      try {
        await logout();
        console.log("✅ Logout completed successfully");

        // Force redirect to login page immediately
        console.log("🔄 Redirecting to login page...");
        try {
          router.replace("/(auth)/Login");
          console.log("✅ Router redirect called successfully");
        } catch (routerError) {
          console.error("❌ Router redirect failed:", routerError);
          // Fallback: try push instead of replace
          try {
            router.push("/(auth)/Login");
            console.log("✅ Router push fallback successful");
          } catch (pushError) {
            console.error("❌ Router push also failed:", pushError);
          }
        }
      } catch (error) {
        console.error("❌ Logout failed:", error);
        alert("Failed to logout. Please try again.");
      }
    } else {
      // For mobile, use Alert
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            console.log("❌ Logout cancelled by user");
          },
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            console.log("🔄 Starting logout process...");
            try {
              await logout();
              console.log("✅ Logout completed successfully");

              // Force redirect to login page immediately
              console.log("🔄 Redirecting to login page...");
              try {
                router.replace("/(auth)/Login");
                console.log("✅ Router redirect called successfully");
              } catch (routerError) {
                console.error("❌ Router redirect failed:", routerError);
                // Fallback: try push instead of replace
                try {
                  router.push("/(auth)/Login");
                  console.log("✅ Router push fallback successful");
                } catch (pushError) {
                  console.error("❌ Router push also failed:", pushError);
                }
              }
            } catch (error) {
              console.error("❌ Logout failed:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ]);
    }
  };

  const profileList = getProfileList(handleLogout);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ paddingVertical: 20 }}
      >
        <View className="flex-row items-center gap-4 ml-5">
          <BackBtn />
          <InterSemiBold className="text-lg/5">My Profile</InterSemiBold>
        </View>

        <View className="my-3">
          <View className="px-5 my-2.5 items-center">
            {/* profile image */}
            <View className="justify-center items-center rounded-full overflow-hidden">
              <Image source={PROFILE} style={{ width: 75, height: 75 }} />
            </View>
            {/* profile name section */}
            <View className="mt-3 items-center">
              <View className="flex-row items-center justify-center gap-2">
                <InterMedium className="text-lg/[150%]">
                  {isProfileLoading
                    ? "Loading..."
                    : user?.fullname || user?.username || "Amazing homes"}
                </InterMedium>
                {user?.verified && (
                  <Icon icon={PROFILETICK} width={15} height={15} />
                )}
              </View>
              <InterRegular className="text-xs/[150%] text-secondaryText">
                {user?.account_type === "agent" ? "Agent" : "Client"} •{" "}
                {user?.location || "Location not set"}
              </InterRegular>
              <InterRegular className="text-xs/[150%] text-secondaryText">
                Edit Profile
              </InterRegular>
            </View>

            <View className="mt-3">
              <Button className="rounded-lg" onPress={toggleMode}>
                <InterMedium className="text-white">
                  {isSeller
                    ? "Switch to buyer account"
                    : "Switch to seller account"}
                </InterMedium>
              </Button>

              {/* Debug buttons for web */}
              {Platform.OS === "web" && (
                <>
                  <Button
                    className="rounded-lg mt-2 bg-blue-500"
                    onPress={debugShowAuthState}
                  >
                    <InterMedium className="text-white">
                      🔍 Debug: Show Auth State
                    </InterMedium>
                  </Button>

                  <Button
                    className="rounded-lg mt-2 bg-red-500"
                    onPress={debugClearAuth}
                  >
                    <InterMedium className="text-white">
                      🔧 Debug: Clear Auth State
                    </InterMedium>
                  </Button>

                  <Button
                    className="rounded-lg mt-2 bg-green-500"
                    onPress={debugForceLogin}
                  >
                    <InterMedium className="text-white">
                      🚀 Debug: Force Login Page
                    </InterMedium>
                  </Button>
                </>
              )}
            </View>
          </View>
        </View>

        {/* profile list section */}
        <View>
          {profileList.map((item) => (
            <TouchableOpacity
              onPress={item.onClick}
              key={item.id}
              disabled={isLoading && item.title === "Logout"}
              className="flex-row items-center justify-between px-5 py-5 border-b border-[#0000001A]"
            >
              <View className="flex-row items-center gap-3">
                <Icon icon={item.icon} width={20} height={20} />
                <InterMedium className="text-base/[150%]">
                  {isLoading && item.title === "Logout"
                    ? "Logging out..."
                    : item.title}
                </InterMedium>
              </View>
              {item.chevronRight && (
                <Icon icon={CHEVRONRIGHT} width={10} height={20} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
