package com.railolog.lab4.models;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "dots")
public class Dot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private double x;

    @Column
    private double y;

    @Column
    private double r;

    @Column
    private boolean hit;

    @Column
    private long creationDateSecondsUTC;

    @Column
    private double execTime;

    public Dot() {
    }

    public Dot(double x, double y, double r) {
        long startTime = System.nanoTime();

        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = check(x, y, r);
        this.creationDateSecondsUTC = Instant.now().getEpochSecond();
        this.execTime = (System.nanoTime() - startTime) / 1e6;
    }

    public boolean check(double x, double y, double r) {
        //r = Math.abs(r);
        double k = 7 / r;
        x = Math.abs(x * k);
        y *= k;

        if (isEqual(y, 0)) {
            return x < 7 || isEqual(x, 7);
        } else if (y > 0) {
            if (x > 7) return false;
            else if (x < 0.5) {
                return y < 2.25 || isEqual(y, 2.25);
            } else if (x < 0.75) {
                double f = 3 * x + 0.75;
                return y < f || isEqual(y, f);
            } else if (x < 1) {
                double f = 9 - 8 * x;
                return y < f || isEqual(y, f);
            } else if (x < 3) {
                double f = (1.5 - 0.5 * x - 3 * Math.sqrt(10) / 7 * (Math.sqrt(3 - x*x + 2 * x) - 2));
                return y < f || isEqual(f, y);
            } else if (x < 7 || isEqual(x, 7)) {
                double f = 3 * Math.sqrt(1 - (x / 7) * (x / 7));
                return y < f || isEqual(y, f);
            }
        } else {
            if (x > 7) return false;
            else if (x < 4) {
                double f = (Math.abs(x / 2) - (3 * Math.sqrt(33) - 7) / 112 * x*x + Math.sqrt(1 - (Math.abs(x - 2) - 1)*(Math.abs(x - 2) - 1)) - 3);
                return y > f || isEqual(f, y);
            } else if (x < 7 || isEqual(x, 7)) {
                double f = -3 * Math.sqrt(1 - (x/ 7) * (x / 7));
                return y > f || isEqual(y, f);
            }
        }

        return false;
    }

    public boolean isEqual(double a, double b) {
        double e = 0.000001d;
        return Math.abs(a - b) < e;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public long getCreationDateSecondsUTC() {
        return creationDateSecondsUTC;
    }

    public void setCreationDateSecondsUTC(long creationDate) {
        this.creationDateSecondsUTC = creationDate;
    }

    public double getExecTime() {
        return execTime;
    }

    public void setExecTime(double execTime) {
        this.execTime = execTime;
    }
}
