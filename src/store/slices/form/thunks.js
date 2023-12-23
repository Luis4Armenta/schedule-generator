import { setSchedules } from "../picker/pickerSlice";
import { finishScheduleGeneration, startScheduleGeneration } from "./formSlice"

export const getSchedules = ( params ) => {
  return async ( dispatch, getState ) => {
    dispatch( startScheduleGeneration() );

    try {
      let res = await fetch("http://localhost:3000/schedules", {
        method: "POST",
        headers:  {'Content-Type':  'application/json'},
        body: JSON.stringify({
          "levels":params.semesters,
          "semesters":params.semesters,
          "start_time":params.startTime,
          "end_time":params.endTime,
          "career":params.career,
          "shifts":["M", "V"],
          "length":params.courseLength,
          "credits":params.credits,
          "available_uses":params.availableUses,
          "excluded_teachers":params.excludedTeachers,
          "excluded_subjects":params.excludedSubjects,
          "extra_subjects":params.extraSubjects,
          "required_subjects":params.requiredSubjects,
        })
      }
      );
      let resJson = await res.json();
      if (res.status === 200) {
        console.log(resJson);
        dispatch( setSchedules(resJson) );
        console.log('Success');
      } else {
        dispatch( setSchedules([]) );
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch( finishScheduleGeneration() );
    }
  }
}
