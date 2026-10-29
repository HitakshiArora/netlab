package com.hiTech.Netlab.Repository;

import com.hiTech.Netlab.Entity.Desktop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesktopRepo extends JpaRepository<Desktop, Integer> {
}
