package com.templatodo.api.Users;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {
   @Autowired
   private UserService userService;
   
   @GetMapping("/user")
   public User getUsers(Principal principal) {
        return this.userService.getUser(principal.getName());
   }

  @PostMapping("/user")
  public User postMethodName(@RequestBody User user, Principal principal) {
      if (user.getId() == principal.getName()){
        this.userService.saveUser(user);
      }
    
      return user;
  }
   
}
