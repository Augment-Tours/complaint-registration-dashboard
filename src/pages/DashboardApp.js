// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  CardActionArea
} from '@material-ui/core';

// components
import Page from '../components/Page';
// import {
//   // AppTasks,
//   // AppNewUsers,
//   // AppBugReports,
//   // AppItemOrders,
//   // AppNewsUpdate,
//   // AppWeeklySales
//   // AppOrderTimeline,
//   // AppCurrentVisits,
//   // AppWebsiteVisits,
//   // AppTrafficBySite,
//   // AppCurrentSubject,
//   // AppConversionRates
// } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Addis Ababa City">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hi, Welcome Back
          </Typography>
          <Button
            variant="contained"
            // component={RouterLink}
            to="#"
            // onClick={toggleDrawer}
            // startIcon={<Icon icon={plusFill} />}
          >
            New Feedback
          </Button>
        </Stack>

        <Typography variant="h6" sx={{ mb: 1 }}>
          Your Previous Feedbacks
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squat mate reptiles, with over 6,000 species,
                    ranging across all continents except Antarctica Lizards are a widespread group
                    of squat mate reptiles, with over 6,000 species, ranging across all continents
                    except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squat mate reptiles, with over 6,000 species,
                    ranging across all continents except Antarctica.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squat mate reptiles, with over 6,000 species,
                    ranging across all continents except Antarctica Lizards are a widespread group
                    of squat mate reptiles, with over 6,000 species, ranging across all continents
                    except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
