package uk.ac.cardiff.disasterdash.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uk.ac.cardiff.disasterdash.model.ApplicationUser;
import uk.ac.cardiff.disasterdash.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final static String USER_NOT_FOUND = "User with username %s not found.";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, username)));
    }

    // perform basic data validation (check whether username already exists in db)
    // encode password, and store register user in db
    public String registerUser(ApplicationUser applicationUser) {
        boolean userExists = userRepository.findByUsername(applicationUser.getUsername()).isPresent();
        if (userExists) {
            throw new IllegalStateException("Username already taken.");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(applicationUser.getPassword());
        applicationUser.setPassword(encodedPassword);
        userRepository.save(applicationUser);
        return "Account successfully registered.";
    }
}
