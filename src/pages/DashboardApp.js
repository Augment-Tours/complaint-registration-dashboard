import { useContext, useEffect, useState } from 'react';
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
  CardActionArea,
  Chip
} from '@material-ui/core';

// components
import Page from '../components/Page';

import { getOwnedFeedbacks, getAllFeedbacks } from '../request/feedback';
import CreateFeedback from '../components/feedbacks/CreateFeedback';
import { UserContext } from '../utils/context';

export default function DashboardApp() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { user } = useContext(UserContext);

  const toggleDrawer = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const fetchFeedbacks = () => {
    console.log('-->', user);
    if (user.type === 'MODERATOR') {
      return getAllFeedbacks().then((res) => {
        setFeedbacks(res);
      });
    }
    return getOwnedFeedbacks().then((res) => {
      setFeedbacks(res);
    });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [user]);

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
            onClick={toggleDrawer}
            // startIcon={<Icon icon={plusFill} />}
          >
            New Feedback
          </Button>
        </Stack>
        {user.type === 'MEMBER' && (
          <Typography variant="h6" sx={{ mb: 1 }}>
            Your Previous Feedbacks
          </Typography>
        )}
        {user.type === 'MODERATOR' && (
          <Typography variant="h6" sx={{ mb: 1 }}>
            Members Feedbacks
          </Typography>
        )}
        <Grid container spacing={3}>
          {feedbacks.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={3}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.feedback}
                    </Typography>
                    <br />

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {item.file && <Chip label="PDF" />}
                      {user.type === 'MODERATOR' && (
                        <Typography variant="body2" color="text.secondary">
                          {item.username}
                        </Typography>
                      )}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <CreateFeedback
          isOpenFilter={isOpenFilter}
          toggleDrawer={toggleDrawer}
          fetchFeedbacks={fetchFeedbacks}
        />
      </Container>
    </Page>
  );
}
