class Node{
    constructor(username, password) {
        this.username = this.username;
        this.password = password;
        this.left = null;
        this.right = null;
    };
};

class DataTree{
    constructor(){
        this.root = null;
    };

    createRootAccount(username, password){
        if(this.root === null){
            this.root = new Node(username, password);
        }
        else{
            
        }
    };

    validate(username, password){
        if(username === "" || password === ""){
            print("Please enter a username or password");
        }
        else {
            validateAccount(this.root, username, password);
        }
    };
    validateAccount(currentProfile, username, password){
        if(currentProfile === null){
            print("Error: Account does not exist");
        }
        else if(username < currentProfile.username){
            this.validateAccount(currentProfile.left, username, password);
        }
        else if(username > currentProfile.username){
            this.validateAccount(currentProfile.right, username, password);
        }
        else{
            if(password !== currentProfile.password){
                print("Error: Incorrect password");
            }
            else{
                //Login the user
            }
        }
    }
};