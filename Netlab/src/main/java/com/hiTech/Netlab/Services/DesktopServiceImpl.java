package com.hiTech.Netlab.Services;

import com.hiTech.Netlab.Entity.Desktop;
import com.hiTech.Netlab.Exception.ResourceNotFoundException;
import com.hiTech.Netlab.Repository.DesktopRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesktopServiceImpl implements DesktopService {

    @Autowired
    private DesktopRepo desktopRepo;

    @Override
    public List<Desktop> getAllDesktop() {
        return desktopRepo.findAll();
    }

    @Override
    public Desktop createDesktop(Desktop desktop) {
        return desktopRepo.save(desktop);
    }

    @Override
    public Desktop getDesktopById(Integer id) {
        return desktopRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Desktop not found with id: " + id));
    }

    @Override
    public Desktop updateDesktop(Integer id, Desktop desktop) {

        Desktop existingDesktop = getDesktopById(id);

        existingDesktop.setServiceTag(
                desktop.getServiceTag() != null
                        ? desktop.getServiceTag()
                        : existingDesktop.getServiceTag());

        existingDesktop.setDescription(
                desktop.getDescription() != null
                        ? desktop.getDescription()
                        : existingDesktop.getDescription());

        existingDesktop.setHardwareConf(
                desktop.getHardwareConf() != null
                        ? desktop.getHardwareConf()
                        : existingDesktop.getHardwareConf());

        existingDesktop.setLocation(
                desktop.getLocation() != null
                        ? desktop.getLocation()
                        : existingDesktop.getLocation());

        existingDesktop.setIpAddress(
                desktop.getIpAddress() != null
                        ? desktop.getIpAddress()
                        : existingDesktop.getIpAddress());

        existingDesktop.setOs(
                desktop.getOs() != null
                        ? desktop.getOs()
                        : existingDesktop.getOs());

        existingDesktop.setTeam(
                desktop.getTeam() != null
                        ? desktop.getTeam()
                        : existingDesktop.getTeam());

        existingDesktop.setStatus(
                desktop.getStatus() != null
                        ? desktop.getStatus()
                        : existingDesktop.getStatus());

        existingDesktop.setPurchaseBy(
                desktop.getPurchaseBy() != null
                        ? desktop.getPurchaseBy()
                        : existingDesktop.getPurchaseBy());

        return desktopRepo.save(existingDesktop);
    }

    @Override
    public void deleteDesktop(Integer id) {

        Desktop existingDesktop = getDesktopById(id);
        desktopRepo.delete(existingDesktop);
    }

}
