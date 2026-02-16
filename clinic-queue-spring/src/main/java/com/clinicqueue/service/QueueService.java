package com.clinicqueue.service;

import com.clinicqueue.model.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class QueueService {

    private final Queue<Patient> queue = new LinkedList<>();
    private final AtomicInteger tokenCounter = new AtomicInteger(1);
    private Patient nowServing;

    public Patient addPatient(String name) {
        int token = tokenCounter.getAndIncrement();
        Patient patient = new Patient(token, name);
        queue.offer(patient);
        return patient;
    }

    public Patient callNext() {
        nowServing = queue.poll();
        return nowServing;
    }

    public Patient getNowServing() {
        return nowServing;
    }

    public int getWaitingCount() {
        return queue.size();
    }

    public List<Patient> getFullQueue() {
        List<Patient> result = new ArrayList<>();
        if (nowServing != null) {
            result.add(nowServing);
        }
        result.addAll(queue);
        return result;
    }
}
