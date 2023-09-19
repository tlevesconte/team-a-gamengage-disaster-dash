package uk.ac.cardiff.disasterdash.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ApplicationController {

    @RequestMapping(path = "/")
    public String startMenu() {
        return "start-menu";
    }

    @RequestMapping(path = "/login")
    public String login() {
        return "login-interface";
    }

    @RequestMapping(path = "/register")
    public String register() {
        return "registration-interface";
    }

    @RequestMapping(path = "/admin")
    public String admin() {
        return "admin-interface";
    }

    @RequestMapping(path = "/option")
    public String optional() {
        return "option-interface";
    }

    @RequestMapping(path = "/tutorial")
    public String tutorial() {
        return "tutorial-interface";
    }
    @RequestMapping(path = "/admin/questionOrder")
    public String questionOrder() {
        return "question-order";
    }
}