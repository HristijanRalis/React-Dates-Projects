import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./AgeCalculator.css";
export const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const handleAgeCalculation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate) return;

    const birth = new Date(birthDate);
    const current = currentDate ? new Date(currentDate) : new Date();

    if (birth > current) {
      alert("Birth date cannot be in the future!");
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleReset = () => {
    setBirthDate("");
    setCurrentDate("");
    setAge(null);
  };

  return (
    <div className="AgeCalculator">
      <div className="row">
        <h2 className="TITLE">Let's Find Out Your Age!</h2>
      </div>
      <div className="row">
        <form className="AgeForm" onSubmit={handleAgeCalculation}>
          <div className="ageDiv">
            <label className="ageLabel">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="ageDiv">
            <label className="ageLabel">Current Date</label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <button className="ageBtn" type="submit">
                <FontAwesomeIcon icon={faCalculator} size="lg" />
                Calculate
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button className="ageBtn" type="button" onClick={handleReset}>
                <FontAwesomeIcon icon={faRotateRight} size="lg" />
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row AgeOutput my-3">
        <div className="col-12 col-md-4 ageColumn">
          <span className="AgeOutputSpan">Years: {age ? age.years : "--"}</span>
        </div>
        <div className="col-12 col-md-4 ageColumn">
          <span className="AgeOutputSpan">
            Months: {age ? age.months : "--"}
          </span>
        </div>
        <div className="col-12 col-md-4 ageColumn">
          <span className="AgeOutputSpan">Days: {age ? age.days : "--"}</span>
        </div>
      </div>
    </div>
  );
};
