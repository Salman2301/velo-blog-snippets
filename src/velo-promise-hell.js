import wixData from "wix-data";
import wixUsers from "wix-users";

let currentUserEmail;

$w.onReady(()=>{
    if( wixUsers.currentUser.loggedIn ) {
        wixUsers.promptLogin({ mode: "login"})
        .then(user=>{
            return user.getEmail()
        })
        .then(email=>{
            currentUserEmail = email;
            return wixData.query("myUser")
            .eq("email", email)
            .find()
        })
        .then(resUser=>{
            if( resUser.length > 0 ) {
                console.log("User logged in and stored user email in the 'myUser' database")
            }
            else {
                return wixData.insert("myUser", { email: currentUserEmail });
            }
        })
    }
});
