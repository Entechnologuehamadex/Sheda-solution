import { PROFILESETTING, HELP, MESSAGE, LOGOUT } from "@/assets/icons"


const profileList = [
    {
        id: 1,
        icon: PROFILESETTING,
        title: "Settings",
        chevronRight: true,
        onclick: () => {
            console.log("Settings clicked");
        }
    },
    {
        id: 2,
        icon: HELP,
        title: "Help",
        chevronRight: true,
        onPress: () => {
            console.log('Help clicked')
        }
    },
    {
        id: 3,
        icon: MESSAGE,
        title: "Message",
        chevronRight: true,
        onPress: () => {
            console.log('Message clicked')
        }
    },
    {
        id: 4,
        icon: LOGOUT,
        title: "Logout",
        chevronRight: false,
        onPress: () => {
            console.log('logout clicked')
        }
    },
]

export default profileList;