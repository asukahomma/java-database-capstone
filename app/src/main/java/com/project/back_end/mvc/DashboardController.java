package com.project.back_end.mvc;
import java.util.Map;

import org.springframework.stereotype.Controller;

import com.project.back_end.services.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;


@Controller
public class DashboardController {

    @Autowired 
    Service service;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token){
        Map<String,String> result = service.validateToken(token, "admin").getBody();
        if(result == null || result.isEmpty()){
            return "admin/adminDashboard";
        }else {
            return "redirect:http://localhost:8080";
        }

    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token){
        Map<String,String> result = service.validateToken(token, "doctor").getBody();
        if(result == null || result.isEmpty()){
            return "doctor/doctorDashboard";
        }else {
            return "redirect:http://localhost:8080";
        }
    }


}
