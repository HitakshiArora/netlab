package com.hiTech.Netlab.Controllers;

import com.hiTech.Netlab.Entity.Desktop;
import com.hiTech.Netlab.Repository.DesktopRepo;
import com.hiTech.Netlab.Services.DesktopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DesktopController {

    @Autowired
    private DesktopRepo desktopRepo;

    @Autowired
    private DesktopService desktopService;

    @GetMapping("/desktops")
    public List<Desktop> getAllDesktop() {
        return desktopService.getAllDesktop();
    }

    @PostMapping("/desktops")
    @ResponseStatus(HttpStatus.CREATED)
    public Desktop createDesktop(@RequestBody Desktop desktop) {
        return desktopService.createDesktop(desktop);
    }

    @GetMapping("/desktops/{id}")
    public Desktop getDesktopById(@PathVariable Integer id) {
        return desktopService.getDesktopById(id);
    }

    @PutMapping("/desktops/{id}")
    public Desktop updateDesktop(
            @PathVariable Integer id,
            @RequestBody Desktop desktop) {
        return desktopService.updateDesktop(id, desktop);
    }

    @DeleteMapping("/desktops/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDesktop(@PathVariable Integer id) {
        desktopService.deleteDesktop(id);
    }

}
