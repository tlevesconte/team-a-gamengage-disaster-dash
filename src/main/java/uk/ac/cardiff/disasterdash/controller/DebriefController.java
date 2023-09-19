package uk.ac.cardiff.disasterdash.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/*RestController for debrief-page*/
@RestController
public class DebriefController {

    @RequestMapping("/debriefSessions")
    public ModelAndView debriefSession() {
        return new ModelAndView("debrief-page");

    }
}



