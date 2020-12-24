package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import model.ChatModel;
import model.Users;
import repository.ChatRepo;
import repository.UsersRepo;

@RestController
@CrossOrigin
public class ChatController {

	@Autowired
	ChatRepo chatRepo;
	
	@Autowired
	UsersRepo userrepo;
	
	@GetMapping("/getChatUsers")
	public List<Users> getChatUsers(@RequestParam("id")String id) {		
		List<Users> userdetails= userrepo.findChatUsers(id);
		if(userdetails!=null)
			return userdetails;
		else
			 return null;
	}
	
	@PostMapping("/chatdetail")
	public List<ChatModel> chatupdate(@RequestBody ChatModel chat) {
		System.out.println("in chat:"+chat.toString());
		if(chat.getMessage()!=null && !chat.getMessage().equals("")) {
			chatRepo.save(chat);
		}
		List<ChatModel> chatdetail=chatRepo.findchats(chat.getFromId(), chat.getToId());
		System.out.println("return values:"+chatdetail.toString());
		return chatdetail;
	}
}
