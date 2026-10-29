package com.hiTech.Netlab.Services;

import com.hiTech.Netlab.Entity.Desktop;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DesktopService {

    List<Desktop> getAllDesktop();

    Desktop createDesktop(Desktop desktop);

    Desktop getDesktopById(Integer id);

    Desktop updateDesktop(Integer id, Desktop desktop);

    void deleteDesktop(Integer id);
}
