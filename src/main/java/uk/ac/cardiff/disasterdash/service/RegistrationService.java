package uk.ac.cardiff.disasterdash.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uk.ac.cardiff.disasterdash.model.Role;
import uk.ac.cardiff.disasterdash.model.ApplicationUser;
import uk.ac.cardiff.disasterdash.registration.RegistrationRequest;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService userService;

    //register the user into the db
    public String register(RegistrationRequest request) {
        return userService.registerUser(
                new ApplicationUser(
                        request.getUsername(),
                        request.getPassword(),
                        Role.ADMIN
                )
        );
    }
}
