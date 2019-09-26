import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';


export default function PositionedTooltips() {

  return (
    <div className="footer">
      <Grid container justify="center">
            <Grid item>
            <Tooltip title="Add" placement="bottom-start">
                <p>© 2019 Mondo. All Rights Reserved.</p>
            </Tooltip>
            </Grid>
      </Grid>
    </div>
  );
}
