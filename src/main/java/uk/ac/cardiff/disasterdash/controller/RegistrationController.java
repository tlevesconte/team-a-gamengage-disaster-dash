package uk.ac.cardiff.disasterdash.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.ac.cardiff.disasterdash.registration.RegistrationRequest;
import uk.ac.cardiff.disasterdash.service.RegistrationService;

@Controller
@RequestMapping(path = "api/registration")
@AllArgsConstructor
public class RegistrationController {

    private RegistrationService registrationService;

    @PostMapping()
    public String register(RegistrationRequest request) {
        System.out.println(registrationService.register(request)); // make request & print success message to console
        return "redirect:/login?success"; // redirect to log in
    }
}
