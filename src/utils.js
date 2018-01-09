export const hasUnLoadNode = (node) => {
  let status = false;
  const loop = data => data.forEach(item => {
    if (item.props.children && !status) {
      if (item.props.children.length === 0) {
        status = true;
        return;
      } else {
        loop(item.props.children);
      }
    }  
  });
  loop(node);
  return status;
};