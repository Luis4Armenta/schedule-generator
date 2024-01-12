import { setGeneratedSchedules, setSchedules, switchToGeneratedSchedules } from "../picker/pickerSlice";
import { finishScheduleGeneration, startScheduleGeneration } from "./formSlice"

export const getSchedules = ( params ) => {
  return async ( dispatch, getState ) => {
    dispatch( startScheduleGeneration() );

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    try {
      let res = await fetch(`${apiEndpoint}/schedules`, {
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
        dispatch( setGeneratedSchedules(resJson) );
        dispatch( switchToGeneratedSchedules() );
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
