package com.templatodo.api.TemplateDefinitions;

import java.time.LocalDate;
import java.util.List;

public class TemplateDefinitionDto {
    private String id;
    private String name;
    private String description;
    private Frequency frequency;
    private int cycleLength;
    private LocalDate startDate;
    private List<TimeSlot> timeSlots;
}
