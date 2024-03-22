package com.templatodo.api.Users;

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
   
   @GetMapping("/users")
   public List<User> getUsers() {
        return this.userService.getAllUsers();
   }

  @PostMapping("/user")
  public User postMethodName(@RequestBody User user) {
      this.userService.saveUser(user);
    
      return user;
  }
   
}
