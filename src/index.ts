async function main() {
  console.time('script_run_time');
}

main()
  .then((resp) => {
    console.log(resp);
    console.log('SUCCESS!');
    console.timeEnd('script_run_time');
  })
  .catch((e) => {
    console.error(e);
    console.log('FAILED!');
    console.timeEnd('script_run_time');
  });
