from manim import *
import numpy as np

class MobiusStripCover(ThreeDScene):
    def construct(self):
        # Title
        title = MathTex(r"\text{Cylinder } \rightarrow \text{ Möbius Strip (2-to-1 Cover)}").to_edge(UP)
        self.add_fixed_in_frame_mobjects(title)
        self.play(Write(title))

        self.set_camera_orientation(phi=70 * DEGREES, theta=315 * DEGREES, zoom=0.9)

        # 1. Start with a cylinder
        cylinder = Cylinder(
            radius=1.5, height=4, direction=OUT,
            fill_opacity=0.6, fill_color=BLUE_D, resolution=(60, 30)
        ).shift(LEFT * 3.5)
        
        # Label for cylinder
        cylinder_label = Tex("Cylinder", r"$S^1 \times I$").arrange(DOWN).scale(0.6)
        self.add_fixed_in_frame_mobjects(cylinder_label)
        cylinder_label.to_corner(UL)
        
        # Initial explanation
        intro_text = Tex("We start with a cylinder - the covering space").scale(0.6)
        self.add_fixed_in_frame_mobjects(intro_text)
        intro_text.to_edge(DOWN)
        
        self.play(Create(cylinder), FadeIn(cylinder_label), FadeIn(intro_text))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # 2. Define the Möbius strip as a Surface
        def mobius_func(u, v):
            x = (1.5 + v * np.cos(u / 2)) * np.cos(u)
            y = (1.5 + v * np.cos(u / 2)) * np.sin(u)
            z = v * np.sin(u / 2)
            return np.array([x, y, z])

        mobius = Surface(
            lambda u, v: mobius_func(u, v),
            u_range=[0, TAU],
            v_range=[-1, 1],
            resolution=(60, 30),
            fill_opacity=0.7,
            fill_color=GREEN_D,
        ).shift(RIGHT * 3.5)

        # Label for Möbius strip
        mobius_label = Tex("Möbius Strip").scale(0.6)
        self.add_fixed_in_frame_mobjects(mobius_label)
        mobius_label.to_corner(UR)

        # Transformation explanation
        transform_text = Tex("The cylinder maps onto the Möbius strip\\\\by identifying opposite edges with a twist").arrange(DOWN).scale(0.6)
        self.add_fixed_in_frame_mobjects(transform_text)
        transform_text.to_edge(DOWN)

        # 3. Animate the transformation
        self.play(FadeIn(transform_text))
        self.wait(1)
        
        self.play(
            Transform(cylinder, mobius),
            FadeIn(mobius_label),
            run_time=3
        )
        self.wait(1)
        self.play(FadeOut(transform_text))

        # 4. Show the covering relationship
        covering_text = Tex("Now let's see the 2-to-1 covering relationship").scale(0.6)
        self.add_fixed_in_frame_mobjects(covering_text)
        covering_text.to_edge(DOWN)
        self.play(FadeIn(covering_text))
        self.wait(1.5)
        self.play(FadeOut(covering_text))

        # Show the preimage cylinder
        cylinder_preimage = Cylinder(
            radius=1.5, height=4, direction=OUT,
            fill_opacity=0.1, fill_color=BLUE_D, 
            stroke_color=BLUE_E, stroke_width=1,
            resolution=(60, 30)
        ).shift(LEFT * 3.5)
        
        covering_explanation = Tex("The transparent cylinder shows", "how it covers the Möbius strip").arrange(DOWN).scale(0.6)
        self.add_fixed_in_frame_mobjects(covering_explanation)
        covering_explanation.to_edge(DOWN)
        
        self.play(FadeIn(cylinder_preimage), FadeIn(covering_explanation))
        self.wait(2)
        self.play(FadeOut(covering_explanation))

        # 5. Demonstrate the covering with paths
        path_explanation = Tex("Watch: One path on the Möbius strip", "corresponds to a path on the cylinder").arrange(DOWN).scale(0.6)
        self.add_fixed_in_frame_mobjects(path_explanation)
        path_explanation.to_edge(DOWN)
        self.play(FadeIn(path_explanation))
        self.wait(1)

        # Path on Möbius
        mobius_path_func = lambda t: mobius_func(2 * PI * t, 0)
        mobius_path = ParametricFunction(mobius_path_func, t_range=[0, 2], color=YELLOW, stroke_width=6).shift(RIGHT * 3.5)
        mobius_dot = Dot3D(point=mobius_path.get_start(), color=YELLOW, radius=0.08)

        # Path on cylinder (2-to-1 cover)
        cylinder_path_func = lambda t: np.array([
            1.5 * np.cos(PI * t),
            1.5 * np.sin(PI * t),
            2 - 2 * t
        ])
        cylinder_path = ParametricFunction(cylinder_path_func, t_range=[0, 2], color=YELLOW, stroke_width=6).shift(LEFT * 3.5)
        cylinder_dot = Dot3D(point=cylinder_path.get_start(), color=YELLOW, radius=0.08)

        self.play(Create(mobius_path), Create(cylinder_path), FadeIn(mobius_dot), FadeIn(cylinder_dot))
        self.wait(0.5)
        self.play(FadeOut(path_explanation))

        # Animation with progress indicator
        motion_text = Tex("The dots trace corresponding paths", "on both surfaces simultaneously").arrange(DOWN).scale(0.6)
        self.add_fixed_in_frame_mobjects(motion_text)
        motion_text.to_edge(DOWN)
        self.play(FadeIn(motion_text))

        self.play(
            MoveAlongPath(mobius_dot, mobius_path),
            MoveAlongPath(cylinder_dot, cylinder_path),
            run_time=8,
            rate_func=linear
        )
        self.wait(1)
        self.play(FadeOut(motion_text))

        # 6. Show the non-orientable property
        orientation_text = Tex("The Möbius strip is non-orientable:", "going around once flips orientation").arrange(DOWN).scale(0.6)
        self.add_fixed_in_frame_mobjects(orientation_text)
        orientation_text.to_edge(DOWN)
        self.play(FadeIn(orientation_text))

        # Add orientation indicator (small arrow/vector)
        def normal_vector_at_t(t):
            # Small normal vector that shows orientation flip
            u = 2 * PI * t
            base_pos = mobius_func(u, 0)
            # Normal vector that flips as we go around
            normal_direction = 0.4 * np.array([
                np.cos(PI * t) * (-np.sin(u) - 0.5 * np.cos(u/2) * np.sin(u/2)),
                np.cos(PI * t) * (np.cos(u) - 0.5 * np.cos(u/2) * np.cos(u/2)),
                np.cos(PI * t) * 0.5 * np.cos(u/2)
            ])
            return base_pos, base_pos + normal_direction

        # Initial orientation arrow
        start_pos, end_pos = normal_vector_at_t(0)
        orientation_arrow = Arrow3D(
            start=start_pos + RIGHT * 3.5,
            end=end_pos + RIGHT * 3.5,
            color=RED,
            thickness=0.03,
            height=0.15,
            base_radius=0.04
        )

        self.play(FadeIn(orientation_arrow))
        self.wait(1)

        # Animate the orientation flip
        def update_orientation_arrow(mob, alpha):
            t = alpha * 2  # Go around twice to see the flip clearly
            start_pos, end_pos = normal_vector_at_t(t)
            new_arrow = Arrow3D(
                start=start_pos + RIGHT * 3.5,
                end=end_pos + RIGHT * 3.5,
                color=RED,
                thickness=0.03,
                height=0.15,
                base_radius=0.04
            )
            mob.become(new_arrow)
            return mob

        self.play(
            UpdateFromAlphaFunc(orientation_arrow, update_orientation_arrow),
            run_time=6
        )
        self.wait(1)
        self.play(FadeOut(orientation_text))