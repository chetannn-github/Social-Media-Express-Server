

export const sendMessage = async (req, res) =>{
    let sender = req.user;
    let reciever = req.params;
    let {message} = req.body;

    // 

}
export const getConversations = async (req, res) =>{
    let currentUser = req.user;
    // saari conversation find kro jisme currentUser participant hain
}

export const getAllMessage = async (req, res) =>{
    let currentUser = req.user; 
    let conversationId = req.par;
    // conversation find kro iid ke basis pr
    // uss conversation id ke jitne bhii message  hain unhe find kro
     
}
