import { PROFILESETTING, HELP, MESSAGE, LOGOUT } from "@/assets/icons"
import { router } from "expo-router";


const profileList = [
    {
        id: 1,
        icon: PROFILESETTING,
        title: "Settings",
        chevronRight: true,
        onClick: () => {
            router.push('/profile-setting')
        }
    },
    {
        id: 2,
        icon: HELP,
        title: "Help",
        chevronRight: true,
        onClick: () => {
            router.push('/support')
        }
    },
    {
        id: 3,
        icon: MESSAGE,
        title: "Feedback",
        chevronRight: true,
        onClick: () => {
            router.push('/support-feedback')
        }
    },
    {
        id: 4,
        icon: LOGOUT,
        title: "Logout",
        chevronRight: false,
        onClick: () => {
            console.log('logout clicked')
        }
    },
]

export default profileList;