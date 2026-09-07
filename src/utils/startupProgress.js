export function calculateProgress(startup) {
  let completed = 0;

  if (startup.basics?.title) completed++;
  if (startup.problem?.problem) completed++;
  if (startup.solution?.solution) completed++;
  if (startup.market?.targetAudience) completed++;
  if (startup.business?.vision) completed++;

  return Math.round((completed / 5) * 100);
}
