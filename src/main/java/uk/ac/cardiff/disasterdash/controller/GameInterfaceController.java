package uk.ac.cardiff.disasterdash.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class GameInterfaceController {

    @RequestMapping("/gameLevels")
    public ModelAndView gameLevel(){ return new ModelAndView("game") ;}
    @RequestMapping("/storms")
    public ModelAndView stormsPage(){
        return new ModelAndView("storm-interface") ;
    }
    @RequestMapping("/drought")
    public ModelAndView droughtPage(){
        return new ModelAndView("drought-interface") ;
    }
    @RequestMapping("/epidemics")
    public ModelAndView epidemicsPage(){
        return new ModelAndView("epidemics-interface") ;
    }
    @RequestMapping("/heatwave")
    public ModelAndView heatwavePage(){
        return new ModelAndView("heatwave-interface") ;
    }
    @RequestMapping("/soilErosion")
    public ModelAndView soilErosionPage(){
        return new ModelAndView("soil-interface") ;
    }
    @RequestMapping("/questionfeaturepage")
    public ModelAndView QuestionFeaturePage(){
        return new ModelAndView("QuestionFeaturePage") ;
    }
    @RequestMapping("/multiplayer")
    public ModelAndView MultiplayerPage(){
        return new ModelAndView("multiplayer") ;
    }

}
