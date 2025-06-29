'use client';
import styles from '../css/Calendar.module.css';

export default function Calendar() {
    return (
        <div className={styles.calendar}>
            <div className={styles.weekdays}>
                <div className={styles.weekday}>Sun</div>
                <div className={styles.weekday}>Mon</div>
                <div className={styles.weekday}>Tue</div>
                <div className={styles.weekday}>Wed</div>
                <div className={styles.weekday}>Thu</div>
                <div className={styles.weekday}>Fri</div>
                <div className={styles.weekday}>Sat</div>
            </div>
            <div className={styles.days}>
                <div className={styles.emptyDay}></div>
                <div className={styles.emptyDay}></div>
                <div className={styles.emptyDay}></div>
                <div className={styles.emptyDay}></div>
                <div className={styles.emptyDay}></div>
                <div className={styles.emptyDay}></div>
                <div className={styles.day}  data-special="true">1</div>
                <div className={styles.day}>2</div>
                <div className={styles.day}>3</div>
                <div className={styles.day}>4</div>
                <div className={styles.day}>5</div>
                <div className={styles.day}>6</div>
                <div className={styles.day}>7</div>
                <div className={styles.day}>8</div>
                <div className={styles.day}>9</div>
                <div className={styles.day}>10</div>
                <div className={styles.day}>11</div>
                <div className={styles.day}>12</div>
                <div className={styles.day}>13</div>
                <div className={styles.day}>14</div>
                <div className={styles.day}>15</div>
                <div className={styles.day}>16</div>
                <div className={styles.day}>17</div>
                <div className={styles.day}>18</div>
                <div className={styles.day}>19</div>
                <div className={styles.day}>20</div>
                <div className={styles.day}>21</div>
                <div className={styles.day}>22</div>
                <div className={styles.day}>23</div>
                <div className={styles.day}>24</div>
                <div className={styles.day}>25</div>
                <div className={styles.day}>26</div>
                <div className={styles.day}>27</div>
                <div className={styles.day}>28</div>
                <div className={styles.day}>29</div>
                <div className={styles.day}>30</div>
            </div>
        </div>
    );
}
